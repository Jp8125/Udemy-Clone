import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { UserStateService } from '../../Services/user.state.service';
import { UserUpdateModel } from '../../../Interfaces/user-update.model';
import { UploadService } from 'src/app/Services/upload.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
userprofile:UserUpdateModel={} as UserUpdateModel
editProfile!:FormGroup
id!:number
myfile!: File;
imgValue!:string;
imgSrc:string="https://udemy-project-bucket.s3.ap-south-1.amazonaws.com/Profiles/10-08-2023+15%3A40%3A39user.png";
constructor(private fb:FormBuilder,private AuthSevice:AuthService,private userStore:UserStateService,private upload:UploadService){
this.id=this.userStore.id
this.editProfile=this.fb.group({
  firstName: ['',[Validators.required]],
  lastName: ['',[Validators.required]],
  email: ['',[Validators.required,Validators.email]],
  phonNo: ['',[Validators.required,Validators.pattern(/^\d+$/),Validators.minLength(10),Validators.maxLength(10)]]
})
this.userStore.User.subscribe(res=>{
  if(res.id!=undefined){
    this.id=res.id
    this.userprofile={firstName:res.name.split(" ")[0],lastName:res.name.split(" ")[1],email:res.email,phonNo:res.phonNo}
    this.editProfile.patchValue(this.userprofile)
  } 
})
}
EditProfile(){
  if(this.editProfile.valid){
    this.AuthSevice.UpdateProfile(this.editProfile.value,this.id).subscribe({
      next:(res)=>{
        alert(res.message);
        this.userStore.SetUserState(this.id)
      },
      error:(err)=>{
        console.log(err);
      }}
    );
  }
}
GetFile(event:any){
  
  this.myfile = event.target.files[0];
  let formdata = new FormData();
    formdata.append('file', this.myfile)
  this.upload.GetProfileUrl(formdata).subscribe({
    next:(value)=> {
      this.imgSrc=value.url
      alert(value.message)
    },
    error:(err)=>{
      console.log(err);
    },
  })
}
UpdateImg(){
this.AuthSevice.UpdateProfileImg(this.imgSrc,this.id).subscribe({
  next:(res)=>{
    alert(res.message);
    this.userStore.SetUserState(this.id);
  },
  error:(err)=>{
    console.log(err);
  }
})
}
}
