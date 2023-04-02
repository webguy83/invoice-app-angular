import { Params } from '@angular/router';
import { map, Observable } from 'rxjs';
import { StatusParams } from './interfaces';

function filterObjectParams(params: Params) {
  return Object.keys(params)
    .filter((key) => params[key] === 'true' || params[key] === 'false')
    .reduce<Params>((obj, key) => {
      obj[key] = params[key];
      return obj;
    }, {});
}

export function modifyQueryParams(queryParams: Observable<Params>) {
  return queryParams.pipe(
    map((params) => {
      const paramsObj = { ...filterObjectParams(params) };
      Object.keys(paramsObj).forEach((param) => {
        if (paramsObj[param] === 'true' || paramsObj[param] === 'false') {
          paramsObj[param] = JSON.parse(paramsObj[param]);
        }
      });
      return paramsObj as StatusParams;
    })
  );
}
