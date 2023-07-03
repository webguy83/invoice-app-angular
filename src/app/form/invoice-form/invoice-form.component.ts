import { AdddaysPipe } from './../../shared/pipes/adddays.pipe';
import { InvoiceService } from './../../services/invoice.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { BreakpointsService } from 'src/app/services/breakpoint.service';
import { Invoice } from 'src/app/utils/interfaces';

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

interface ItemListForm {
  cap_values: CapVal[];
}

interface CapVal {
  itemName: string;
  price: number;
  qty: number;
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
  providers: [AdddaysPipe],
})
export class InvoiceFormComponent implements OnInit, OnDestroy {
  bp$!: Observable<string>;
  sub = new Subscription();
  errors: string[] = [];
  resetSubject: Subject<boolean> = new Subject();
  reset$: Observable<boolean> = this.resetSubject.asObservable();

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
    private adddaysPipe: AdddaysPipe
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  ngOnInit(): void {
    this.bp$ = this.breakpointService.breakpoint$;

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

  onDiscardClick() {
    this.form.reset();
    this.resetSubject.next(true);
  }

  onSubmit() {
    const { billFromForm, billToForm, itemListForm, miscInfoForm } =
      this.form.value;
    if (billFromForm && billToForm && itemListForm && miscInfoForm) {
      const items = itemListForm.cap_values;
      const invoice: Partial<Invoice> = {
        clientEmail: billToForm.clientEmail,
        clientName: billToForm.clientName,
        clientAddress: {
          city: billToForm.clientCity,
          country: billToForm.clientCountry,
          postCode: billToForm.clientPostCode,
          street: billToForm.clientStreetAddress,
        },
        createdAt: this.adddaysPipe.transform(
          miscInfoForm.invoiceDate,
          miscInfoForm.paymentTerms
        ),
        description: miscInfoForm.projectDescription,
        items: [],
        senderAddress: {
          city: billFromForm.senderCity,
          country: billFromForm.senderCountry,
          postCode: billFromForm.senderPostCode,
          street: billFromForm.senderStreetAddress,
        },
        status: 'pending',
        paymentTerms: miscInfoForm.paymentTerms,
      };
      console.log(this.form.value);
    }
  }
}
