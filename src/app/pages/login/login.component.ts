import { Component,OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  showText = false;

  email = new FormControl('');
  password = new FormControl('');

  loadingSubscription?: Subscription;
  loadingObservation?: Observable<boolean>;

  loading: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    if (this.email.value && this.password.value !== null) {
      this.authService.login(this.email.value, this.password.value).then(cred => {
        this.router.navigateByUrl('/myfeed');

      }).catch(error => {
        this.showText = true;
      });
    }
  }

  toregister() {
    this.router.navigate(['/register']);
  }

}
