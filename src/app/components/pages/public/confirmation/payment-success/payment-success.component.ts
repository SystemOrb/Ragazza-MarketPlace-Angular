import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartialObserver } from 'rxjs';
declare function init_plugins();
@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {
  public ticket: number = 0;
  public status: boolean | string;
  public message: string = '';
  constructor(private _parameters: ActivatedRoute) {
    this._parameters.params.subscribe(
      (index: PartialObserver<any> | any): void => {
        if (index['status'] === 'true') {
          this.status = true;
        } else {
          this.status = false;
        }
      }
    );
    this._parameters.queryParams.subscribe(
      (index: PartialObserver<any> | any): void => {
        this.ticket = Number(atob(index['ticket']));
        if (index['msg']) {
          switch (index['msg']) {
            case '402' :
              this.message = 'Fallo en las credenciales';
              break;
            case '400':
             this.message = 'El monto es inválido';
             break;
             case '500':
             this.message = 'No pudimos procesar tu pago';
             break;
          }
        }
      }
    );
    console.log(this.ticket);
    console.log(this.status);
   }

  ngOnInit() {
    init_plugins();
  }

}
