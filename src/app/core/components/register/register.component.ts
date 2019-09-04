import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SubjectService} from '../../services/subject.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;

    constructor(
        private auth: AuthService,
        private router: Router,
        private dialog: MatDialog,
        // private toastr: ToastrService,
        private subject: SubjectService,
        private registerDialogRef: MatDialogRef<RegisterComponent>,
        private fb: FormBuilder
    ) {
        this.registerForm = fb.group({
            name: '',
            email: '',
            password: ['']
        });
    }

    ngOnInit() {
        // this.get();
    }

    showLogin() {
        this.registerDialogRef.close();
        // this.dialog.closeAll();
        this.subject.setDialogState({state: 'closed', dialog: 'register'});

    }

    register() {
        this.auth.register(this.registerForm.value).subscribe((r: any) => {

            // this.toastr.success('Registered successfully');
            this.dialog.closeAll();
            // this.router.navigate(['']);
        });
    }

}
