import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBuilder } from 'ng-mocks';
import { LoginComponent } from './login.component'
import { AppModule } from '../../app.module';
import { AuthenticationService } from '../../services/authentication.service';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let authenticationService: AuthenticationService

    beforeEach(async () => {
        let mockInstance =
        MockBuilder(LoginComponent, AppModule)
        .keep(RouterModule)
        .keep(RouterTestingModule.withRoutes([]))
        .replace(HttpClientModule, HttpClientTestingModule)
        .build();
        await TestBed.configureTestingModule(mockInstance).compileComponents();
        fixture = TestBed.createComponent(LoginComponent);
        authenticationService = TestBed.get(AuthenticationService);
        component = fixture.componentInstance;
        component.loginForm = new FormGroup({
            username: new FormControl(''),
            password: new FormControl('')
        })
        component.showPassword = false;
        spyOn(component['authenticationService'],'authenticate')
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('onSubmit method call', () => {
        let spy = spyOn(authenticationService,'authenticate') 
        component.onSubmit();
        expect(spy).toHaveBeenCalled();
    });

    it('togglePasswordVisibility method call', () => {
        component.togglePasswordVisibility();
        expect(component.showPassword).toBeTruthy();
        component.showPassword = true;
        component.togglePasswordVisibility();
        expect(component.showPassword).toBeFalsy();
    });
});
