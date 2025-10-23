import { Component } from '@angular/core';
import { AdminService } from '../../Services/admin.service';
import { Observable } from 'rxjs';
import { EarningModel } from 'src/app/Interfaces/earning.model';

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.css']
})
export class EarningsComponent {
  earnings!:Observable<Array<EarningModel>>
constructor(private admin:AdminService){
  this.earnings=this.admin.GetEarnings()
}
}
