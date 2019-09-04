import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterComponent} from '../register/register.component';
import {SubjectService} from '../../services/subject.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    @ViewChild('closest') closest: ElementRef;
    @Output() openRegister = new EventEmitter();
    options: FormGroup;
    loginForm: FormGroup;
    submitted = false;

    constructor(
        private auth: AuthService,
        public router: Router,
        private dialog: MatDialog,
        // private common: CommonService,
        private subject: SubjectService,
        private loginDialogRef: MatDialogRef<LoginComponent>,
        private fb: FormBuilder,
        // private cookie: CookieService
    ) {
        this.loginForm = this.fb.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.required]
        });


        this.options = fb.group({
            hideRequired: false,
            floatLabel: 'always',
        });
    }

    ngOnInit() {
    }

    showRegister() {
        this.loginDialogRef.close();
        this.subject.setDialogState({state: 'closed', dialog: 'login'});

        // const dialogRef = this.dialog.open(RegisterComponent, {
        //     width: '500px',
        //     data: {}
        // });
        //
        // dialogRef.afterClosed().subscribe(result => {
        //     console.log('The dialog was closed');
        // });


        // ModalDialog.openDialog(2, this.matDialog);
    }

    authenticate(data) {
        this.submitted = true;
        this.auth.authenticate(this.loginForm.value).subscribe((r: any) => {

            // this.cookie.delete('uniqueUserId', '/');
            localStorage.setItem('full_name', r.fullname);
            localStorage.setItem('userInf', JSON.stringify(r['token']));
            localStorage.setItem('token', r['token']);
            // this.subject.setUserData({...JWT(r.token), ...{fullName: r.fullname}});
            //this.router.navigate(['']);
            let el: HTMLElement = this.closest.nativeElement as HTMLElement;
            el.click();
        });
    }

    openForgotPass() {
        this.router.navigate(['forgot-password']);
    }

}
