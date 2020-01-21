
import {Component} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import { HttpClient } from '@angular/common/http';

import {S3Service} from '../services/s3.service'
import {WorkflowService} from '../services/workflow.service'
import {WorkflowPage} from '../models/page/workflow_page'
import {Workflow} from '../models/workflow'

@Component({
  selector: 'transcript-viewer-component',
  templateUrl: 'transcript_viewer.component.html',
  styleUrls: ['./transcript_viewer.component.less'],
})

export class TranscriptViewerComponent {
  workflow_id: number;
  workflow: Workflow;
  transcript: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private workflowService: WorkflowService,
    private s3Service: S3Service,
  ) {}

  ngOnInit() {
    const filename = 'transcript.json';

    this.route
      .params
      .subscribe(params => {
        console.log(params)
        this.workflow_id = +params['id']

        this.workflowService.getWorkflow(this.workflow_id)
          .subscribe(workflowPage => {
            this.workflow = workflowPage.data;

            if(this.workflow.artifacts.length > 0) {
              console.log(this.workflow)
              const file_path = this.getDestinationFilename(this.workflow, filename);
              const current = this

              if(file_path) {
                this.s3Service.getPresignedUrl(file_path).subscribe(response => {
                  this.http.get(response.url).subscribe(content => {
                    this.transcript = content
                  })
                });
              }
            }
          });


      })
  }

  getDestinationFilename(workflow, extension: string, not_extension?: string) {
    const result = workflow.jobs.filter(job => {
      if(job.name == "job_transfer" &&
        job.params.filter(param => param.id === "destination_access_key").length == 1){
        const parameter = job.params.filter(param => param.id === "destination_path");
        console.log("HEREEEEEEEEEEEEee")
        if(parameter.length > 0) {
          if(not_extension) {
            return parameter[0].value.endsWith(extension) && !parameter[0].value.endsWith(not_extension)
          } else {
            return parameter[0].value.endsWith(extension)
          }
        } else {
          return false
        }
      } else {
        return false
      }
    });

    if(result.length == 0){
      return undefined;
    }

    return result[0].params.filter(param => param.id === "destination_path")[0].value;
  }
}
