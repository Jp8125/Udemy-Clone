import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { UserStateService } from '../../Services/user.state.service';
import { Store } from '@ngrx/store';
import { CartStore } from 'src/app/Interfaces/CartStore.model';
import { loadcarts } from 'src/app/CartStore/carts.actions';
import { PurchaseStore } from 'src/app/Interfaces/purchasestore.model';
import { loadPurchases } from 'src/app/PurchaseStore/purchase.actions';
import { ProgressState } from 'src/app/Interfaces/progress-state';
import { loadProgress } from 'src/app/ProgressStore/progress.action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
constructor(private state:UserStateService,private cartStore:Store<CartStore>,private purchaseStore:Store<PurchaseStore>,private userProgress:Store<ProgressState>){
let id=this.state.id
this.cartStore.dispatch(loadcarts({id:id}))
this.purchaseStore.dispatch(loadPurchases({id:id}))

}
}
