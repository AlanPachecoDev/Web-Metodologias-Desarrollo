import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor( private router: Router, private route: ActivatedRoute) { };

  goToWorkers(){
    let codigo: any;

    codigo = this.route.snapshot.paramMap.get('codigo') ? this.route.snapshot.paramMap.get('codigo') : "";
    console.log("codigo: ", codigo);
    this.router.navigate(['/listar-trabajadores', codigo]);
  }
}
