import { EmployeeApi } from './../../../shared/services/custom/Employee';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organization-page',
  templateUrl: './organization-page.component.html',
  styleUrls: ['./organization-page.component.scss']
})
export class OrganizationPageComponent implements OnInit {

    topEmployee: any = {
        name: 'No Data',
        designation: '',
        subordinates: []
    };
    dataEmployee: any = [];

    constructor(
        public employeeApi: EmployeeApi
    ) { }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.employeeApi.find({
            order: 'parentid DESC',
            include: 'employeeposition',
        }).subscribe(result => {
            if (result.length !== 0) {
                for (const data of result) {
                    this.dataEmployee.push({
                        id: data['id'],
                        name: data['name'],
                        designation: data['employeeposition']['name'],
                        subordinates: []
                    });
                }

                result.forEach((data, index) => {
                    if (data['parentid'] !== 'null') {
                        const temp = this.dataEmployee[index];
                        // Search parent by parentid
                        result.forEach((cek, indexcek) => {
                            if (data['parentid'] === cek['id']) {
                                this.dataEmployee[indexcek]['subordinates'].push(temp);
                                this.dataEmployee[indexcek]['subordinates']
                                    .sort((a: any, b: any) => {
                                        if (a.id < b.id) { return -1;
                                        } else if (a.id > b.id) {  return 1;
                                        } else { return 0; }
                                    }
                                );
                                delete this.dataEmployee[index];
                            }
                        });
                    }
                });
                this.topEmployee = this.dataEmployee.filter(item => item !== null)[0];
            }
        });
    }
}
