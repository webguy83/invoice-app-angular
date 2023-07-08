import { SortcharsPipe } from './../../shared/pipes/sortchars.pipe';
import { InvoicesStore } from './../../services/invoices.store';
import { InvoiceService } from './../../services/invoice.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { BreakpointsService } from 'src/app/services/breakpoint.service';
import {
  CapVal,
  Invoice,
  Item,
  ItemListForm,
  Status,
} from 'src/app/utils/interfaces';

interface BillFromForm {
  senderCity: string;
  senderCountry: string;
  senderPostCode: string;
  senderStreetAddress: string;
}

interface BillToForm {
  clientCity: string;
  clientCountry: string;
  clientEmail: string;
  clientName: string;
  clientPostCode: string;
  clientStreetAddress: string;
}

interface MiscInfoForm {
  invoiceDate: Date;
  paymentTerms: number;
  projectDescription: string;
}

interface GroupForm {
  billFromForm: BillFromForm;
  billToForm: BillToForm;
  itemListForm: ItemListForm;
  miscInfoForm: MiscInfoForm;
}

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss'],
  providers: [SortcharsPipe],
})
export class InvoiceFormComponent implements OnInit, OnDestroy {
  bp$!: Observable<string>;
  sub = new Subscription();
  invoiceBeingEditedSub = new Subscription();
  errors: string[] = [];
  resetSubject: Subject<boolean> = new Subject();
  reset$: Observable<boolean> = this.resetSubject.asObservable();
  currentEditedInvoice: null | Invoice = null;
  headerTxt = 'New Invoice';

  form = this.fb.group<GroupForm>({
    billFromForm: {
      senderCity: '',
      senderCountry: '',
      senderPostCode: '',
      senderStreetAddress: '',
    },
    billToForm: {
      clientCity: '',
      clientCountry: '',
      clientEmail: '',
      clientName: '',
      clientPostCode: '',
      clientStreetAddress: '',
    },
    miscInfoForm: {
      invoiceDate: new Date(),
      paymentTerms: 30,
      projectDescription: '',
    },
    itemListForm: {
      cap_values: [
        {
          itemName: '',
          price: 0,
          qty: 1,
        },
      ],
    },
  });

  constructor(
    private fb: NonNullableFormBuilder,
    private breakpointService: BreakpointsService,
    private invoiceService: InvoiceService,
    private invoicesStore: InvoicesStore,
    private sortCharsPipe: SortcharsPipe
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.invoiceBeingEditedSub.unsubscribe();
  }
  ngOnInit(): void {
    this.bp$ = this.breakpointService.breakpoint$;
    this.invoiceBeingEditedSub =
      this.invoicesStore.invoiceBeingEdited$.subscribe((invoice) => {
        this.currentEditedInvoice = invoice;
        if (invoice) {
          this.headerTxt = this.sortCharsPipe.transform(invoice.id);
          this.form.patchValue(this.applyDefaultData(invoice));
        } else {
          this.headerTxt = 'New Invoice';
        }
      });

    this.sub = this.form.valueChanges.subscribe(() => {
      const errors: string[] = [
        this.form.controls.billFromForm.errors,
        this.form.controls.billToForm.errors,
        this.form.controls.miscInfoForm.errors,
        this.form.controls.itemListForm.errors,
      ]
        .filter((error) => {
          return error;
        })
        .map((error) => {
          if (error) {
            return error['message'];
          }
        });
      this.errors = [...new Set(errors)];
    });
  }

  applyDefaultData(invoice: Invoice): GroupForm {
    const cap_values: CapVal[] = invoice.items.map((item) => {
      return {
        itemName: item.name,
        price: item.price,
        qty: item.quantity,
      };
    });
    return {
      billFromForm: {
        senderCity: invoice.senderAddress.city,
        senderCountry: invoice.senderAddress.country,
        senderPostCode: invoice.senderAddress.postCode,
        senderStreetAddress: invoice.senderAddress.street,
      },
      billToForm: {
        clientCity: invoice.clientAddress.city,
        clientCountry: invoice.clientAddress.country,
        clientEmail: invoice.clientEmail,
        clientName: invoice.clientName,
        clientPostCode: invoice.clientAddress.postCode,
        clientStreetAddress: invoice.clientAddress.street,
      },
      miscInfoForm: {
        invoiceDate: invoice.invoiceDate,
        paymentTerms: invoice.paymentTerms,
        projectDescription: invoice.description,
      },
      itemListForm: {
        cap_values,
      },
    };
  }

  onDiscardClick() {
    this.form.reset();
    this.resetSubject.next(true);
    this.invoicesStore.closeSideNav();
  }

  convertItems(capVals: CapVal[]): Item[] {
    return capVals.map((capVal) => {
      return {
        name: capVal.itemName,
        price: capVal.price,
        quantity: capVal.qty,
      };
    });
  }

  onGoBackClick() {
    this.invoicesStore.closeSideNav();
  }

  onSubmit() {
    this.sendDataToBackend('pending');
  }

  onSaveAsDraftClick() {
    this.sendDataToBackend('draft');
  }

  sendDataToBackend(status: Status) {
    const { billFromForm, billToForm, itemListForm, miscInfoForm } =
      this.form.value;
    if (billFromForm && billToForm && itemListForm && miscInfoForm) {
      const invoice: Partial<Invoice> = {
        clientEmail: billToForm.clientEmail,
        clientName: billToForm.clientName,
        clientAddress: {
          city: billToForm.clientCity,
          country: billToForm.clientCountry,
          postCode: billToForm.clientPostCode,
          street: billToForm.clientStreetAddress,
        },
        invoiceDate: miscInfoForm.invoiceDate,
        description: miscInfoForm.projectDescription,
        items: this.convertItems(itemListForm.cap_values),
        senderAddress: {
          city: billFromForm.senderCity,
          country: billFromForm.senderCountry,
          postCode: billFromForm.senderPostCode,
          street: billFromForm.senderStreetAddress,
        },
        status,
        paymentTerms: miscInfoForm.paymentTerms,
        createdAt: new Date(),
      };
      if (this.currentEditedInvoice) {
        this.invoiceService
          .editInvoice(this.currentEditedInvoice.id, invoice)
          .subscribe(() => {
            if (this.currentEditedInvoice) {
              this.invoicesStore.refreshInvoiceApi({
                id: this.currentEditedInvoice.id,
                ...invoice,
              });
            }
          });
      } else {
        this.invoiceService.addInvoice(invoice).subscribe(() => {
          this.invoicesStore.refreshInvoicesApi();
        });
      }

      this.invoicesStore.closeSideNav();
    }
  }
}
