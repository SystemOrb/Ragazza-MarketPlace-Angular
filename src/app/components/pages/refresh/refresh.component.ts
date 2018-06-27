import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-refresh',
  templateUrl: './refresh.component.html',
  styles: []
})
export class RefreshComponent implements OnInit {

  constructor(private _param: ActivatedRoute, private _route: Router) {
  }
/*
Refresca una pagina solicitada
*/
  ngOnInit() {
    this._param.params.subscribe(
      (get: any) => {
        if (get['id'] !== 'nuevo') {
          this._route.navigate(['/' + get['toURL'], get['id']]);
        }
      }
    );
  }

}
