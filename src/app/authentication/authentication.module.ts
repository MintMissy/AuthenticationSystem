import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthenticationService } from './service/authentication.service';
import { UserFactory } from './service/user.factory';
import { AuthenticationEffects } from './state/auth.effects';
import { authenticationReducer } from './state/auth.reducer';
import { AUTHENTICATION_FEATURE_KEY } from './state/auth.state';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(AUTHENTICATION_FEATURE_KEY, authenticationReducer),
    EffectsModule.forFeature([AuthenticationEffects]),
  ],
  providers: [
    {
      provide: AuthenticationService,
      useClass: AuthenticationService,
    },
    {
      provide: UserFactory,
      useClass: UserFactory,
    },
  ],
})
export class AuthenticationModule {}
