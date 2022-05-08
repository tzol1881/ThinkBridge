import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup = new FormGroup({})
    submitted = false;
    isValidUser: boolean = true;
    showPassword: boolean = false;
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
        });
    }

    get loginFormValue() {
        return this.loginForm.value;
    }

    onSubmit() {
        this.authenticationService.authenticate().then(res => res.json())
            .then(users => {
                console.log(users);
                let user = users.find((user: any) => user.username === this.loginFormValue.username && user.password === this.loginFormValue.password)
                if (user) {
                    if(user.username === 'johnd'){
                        sessionStorage.setItem('userRole', 'admin')
                    } else{
                        sessionStorage.setItem('userRole', 'user')
                    }
                    sessionStorage.setItem('userId', user.id);
                    this.router.navigate(['/products']);
                } else {
                    this.isValidUser = false;
                }
            })
    }

    togglePasswordVisibility(): void {
        this.showPassword = !this.showPassword
    }
}
