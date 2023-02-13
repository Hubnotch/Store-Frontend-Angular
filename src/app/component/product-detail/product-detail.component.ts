import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.route.snapshot.paramMap.get('id')
    this.route.snapshot.params['id'];
  }

}
