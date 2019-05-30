/*
 *
 *  * Copyright 2016-2017 the original author or authors.
 *  *
 *  * Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  *      http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  * Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  * limitations under the License.
 *
 */

/**
 * @author Vitaliy Fedoriv
 */

import {Component, OnInit, Input} from '@angular/core';
import {Visit} from '../visit';
import {VisitService} from '../visit.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-visit-list',
  templateUrl: './visit-list.component.html',
  styleUrls: ['./visit-list.component.css']
})
export class VisitListComponent implements OnInit {

  @Input() visit: Visit;
  response_status: number;
  delete_success: boolean = false;
  errorMessage: string;

  constructor(private router: Router, private visitService: VisitService) {
    this.visit = <Visit>{};
  }

  ngOnInit() {
  }

  editVisit(visit: Visit) {
    this.router.navigate(['/visits', visit.id, 'edit']);
  }

  deleteVisit(visit: Visit) {
    this.visitService.deleteVisit(visit.id.toString()).subscribe(
      response => {
        this.response_status = response;
        if (this.response_status === 204) {
          this.delete_success = true;
          this.visit = <Visit>{};
        }
      },
      error => this.errorMessage = <any> error);
  }

}
