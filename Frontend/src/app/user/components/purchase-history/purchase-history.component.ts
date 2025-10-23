import { Component, OnInit } from '@angular/core';
import { UserStateService } from '../../Services/user.state.service';
import { AuthService } from 'src/app/Services/auth.service';
import { EarningModel } from 'src/app/Interfaces/earning.model';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {
  page:number=0
  ngOnInit(): void {
    this.auth.getpaymentDetails(this.user.id).subscribe({
      next: (value) => {
        this.payments = value
        console.log(this.payments);
      },
      error(err) {
        console.log(err);
      },
    })
  }
  payments: EarningModel = {} as EarningModel
  constructor(private user: UserStateService, private auth: AuthService) {
    this.payments.courses = []
  }
datevalue(str:string){
  let dt=new Date(str)
  return dt.toLocaleDateString()
}
}
