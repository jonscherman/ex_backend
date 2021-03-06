
import {Component, EventEmitter, Input, Output} from '@angular/core'


import {CredentialService} from '../services/credential.service'
import {Credential} from '../models/credential'

@Component({
  selector: 'credential-component',
  templateUrl: 'credential.component.html',
  styleUrls: ['./credential.component.less'],
})

export class CredentialComponent {
  @Input() data: Credential
  @Output() deleted: EventEmitter<Credential> = new EventEmitter<Credential>();

  pwd_type = "password"

  constructor(
    private credentialService: CredentialService,
  ) {}

  mask(mode) {
    if(mode === true) {
      this.pwd_type = "text"
    } else {
      this.pwd_type = "password"
    }
  }

  delete() {
    this.credentialService.removeCredential(this.data.id)
    .subscribe(credential => {
      this.deleted.next(this.data)
    })
  }
}
