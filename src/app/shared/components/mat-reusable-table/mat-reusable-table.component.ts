import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ConfirmationDialogComponent} from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import {CONFIRM_DIALOG_SETTINGS, MAT_TABLE_PAGINATION_VALUES, SPINNER_DIAMETER} from '@core/constants/app.config';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '@core/services/auth.service';
import {SubjectService} from '@core/services/subject.service';
import {ComplaintsService} from '@core/services/complaints.service';
import {GetTableDataSourcePipe} from '@shared/pipes/get-table-data-source.pipe';

@Component({
    selector: 'app-mat-table',
    templateUrl: './mat-reusable-table.component.html',
    styleUrls: ['./mat-reusable-table.component.scss']
})
export class MatReusableTableComponent implements OnInit, OnDestroy {

    @Input() data;
    @Input() cols;
    @Input() item;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    displayedColumns;
    spinnerDiameter = SPINNER_DIAMETER;
    paginationValues = MAT_TABLE_PAGINATION_VALUES;
    dataSource;
    filteredData;
    subscriptions: Subscription[] = [];
    allResults = true;
    selectedReportsType = 'All';

    constructor(
        private dataSrc: GetTableDataSourcePipe,
        private dialog: MatDialog,
        public router: Router,
        private toastr: ToastrService,
        public auth: AuthService,
        private complaintsService: ComplaintsService,
        private subject: SubjectService
    ) {
    }

    ngOnInit() {

        // this.item = this.item.replace(/_/g, '-');
        this.displayedColumns = this.cols;
        this.getData(this.data);

        this.subject.getTableData().subscribe(dt => {
            this.getData(dt.data);
            this.allResults = !dt.type;
            this.selectedReportsType = dt.type;
        });
    }

    getData(dt, remove = false) {

        if (dt && dt.hasOwnProperty('reports')) {
            dt = dt['reports'];
        }

        if (dt) {
            // Saving data with sorting and pagination
            this.dataSource = this.dataSrc.transform(dt);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;

            if (remove) {
                // this.toastr.success(`The  ${this.item.replace(/_/g, ' ')} info has been removed successfully.`, 'Removed!');
            }

            // Adjusting sort setting here
            this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {

                // Numeric values sorting
                if (sortHeaderId === 'max_people' || sortHeaderId === 'min_people') {
                    data[sortHeaderId] = +data[sortHeaderId];
                    // Non case-sensitive sorting
                } else {
                    if (typeof data[sortHeaderId] === 'string') {
                        return data[sortHeaderId].toLocaleLowerCase();
                    }
                }

                return data[sortHeaderId];
            };

        }


    }

    /**
     * Handles searching
     * @param filterValue search term for filtering table values
     */
    applyFilter(filterValue: string) {
        console.log(filterValue);
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
        console.log(this.dataSource.filteredData);
        this.filteredData = this.dataSource.filteredData;
        // console.log(this.dataSource)
    }


    /**
     * Handles column names normal appearance
     * @param col current column name
     * @returns column normalized name
     */
    normalizeColName(col): string {
        col = `${col[0].toUpperCase()}${col.slice(1)}`;
        return col.replace(/_/g, ' ');
    }

    /**
     * Removes a data row
     * @param row current row data object
     */
    remove(row) {
        // Setting dialog properties
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, CONFIRM_DIALOG_SETTINGS);

        // Post-confirming actions
        this.subscriptions.push(dialogRef.afterClosed().subscribe(
            result => {
                // if (result) {
                //     this.getData(this[`_${this.item.replace(/-/g, '_')}`].remove({id: row.id}), true);
                // }
            }
        ));
    }


    approve(r) {
        this.subscriptions.push(this.complaintsService.approve(r._id, 'Approved').subscribe((d: any) => {
            this.complaintsService.get(this.selectedReportsType ? {type: this.selectedReportsType} : {}).subscribe(dt => {
                this.toastr.success(d.message);
                this.data = dt;
                this.getData(dt);
            });
        }));
    }

    decline(r) {

        // Setting dialog properties
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, CONFIRM_DIALOG_SETTINGS);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.subscriptions.push(this.complaintsService.approve(r._id, 'Declined').subscribe((d: any) => {
                    this.complaintsService.get(this.selectedReportsType ? {type: this.selectedReportsType} : {}).subscribe(dt => {
                        this.toastr.success(d.message);
                        this.data = dt;
                        this.getData(dt);
                    });
                }));
            }
        });


    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }


}
