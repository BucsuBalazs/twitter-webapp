import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
  { 
    path: 'feed', 
    loadChildren: () => import('./pages/feed/feed.module').then(m => m.FeedModule),
  },
  { 
    path: 'myfeed', 
    loadChildren: () => import('./pages/myfeed/myfeed.module').then(m => m.MyfeedModule),
    canActivate: [AuthGuard]
  },
  { 
    path: '', 
    redirectTo: '/feed',
    pathMatch: 'full'
  },
  { 
    path: 'login', 
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
  },
  { 
    path: 'register', 
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule),
  },
  { 
    path: 'profile', 
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/feed'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
