import { Pipe, PipeTransform } from '@angular/core';
/*
 * Usage:
 *   value | jobType
 * Example:
 *   {{ 'ftp_order' | jobType }}
 *   formats to: "FTP transfer"
*/
@Pipe({name: 'jobType'})
export class JobTypePipe implements PipeTransform {

  transform(jobType: string): string {
    var allJobType = [
      { id: 'download_ftp', name: 'FTP download' },
      { id: 'download_http', name: 'HTTP download' },
      { id: 'ftp_order', name: 'FTP transfer' },
      { id: 'generate_dash', name: 'Generate DASH' },
      { id: 'gpac_dash', name: 'DASH generation' },
      { id: 'ttml_to_mp4', name: 'TTML to MP4' },
      { id: 'upload_ftp', name: 'FTP upload' },
    ];

    for (var i = allJobType.length - 1; i >= 0; i--) {
      if(allJobType[i].id == jobType){
        return allJobType[i].name;
      }
    }
    return jobType;
  }
}