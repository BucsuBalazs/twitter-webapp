import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/User';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  showText = false;

  email = new FormControl('');
  password = new FormControl('');
  password2 = new FormControl('');

  loadingSubscription?: Subscription;
  loadingObservation?: Observable<boolean>;

  loading: boolean = false;

  constructor(
    private router: Router, 
    private location: Location, 
    private authService: AuthService,
    private userService: UserService) 
    {

     }

  ngOnInit(): void {
  }

  register() {
    if (this.password.value === this.password2.value){
      if (this.email.value !== null && this.password.value !== null) {
        this.authService.signup(this.email.value, this.password.value).then(cred => {
          console.log(cred);

          let username_from_email: string = ""

          if ( this.email.value  !== null) {
            username_from_email = this.email.value.split('@')[0];
          }

          const user: User = {
            id: cred.user?.uid as string,
            email: this.email.value as string,
            username: username_from_email,
            profile_picture_url: 'assets/pictures/anonim.jpg'
          }

          this.userService.create(user).then(_ => {
            console.log('User added successfully.');
          }).catch(error => {
            console.error(error);
          })

          this.router.navigateByUrl('/myfeed');
        }).catch(error => {
          console.error(error);
          this.showText = true;
        });
      }
    } else {
      console.error(this.password);
      console.error(this.password2);
      this.showText = true;
    }
    
  }

  goback() {
    this.location.back();
  }

}
