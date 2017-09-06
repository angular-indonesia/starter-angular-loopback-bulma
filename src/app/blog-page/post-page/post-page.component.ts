import { BlogpostApi } from './../../../shared/services/custom/Blogpost';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  
  editorContent: any;
  public postContent: any;
  public postDate: any;
  public postTitle: any;
  
  constructor(
    public blogPostApi: BlogpostApi,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  submitPost(){
    console.log('isi wysiwyg',this.editorContent)
    
    this.blogPostApi.create(
      {
        postcontent: this.editorContent,
        postdate:  moment().format('YYYY-MM-DD'),
        posttitle:  this.postTitle

      }
      ).subscribe((result) =>
        this.router.navigate(['/home/blog'])
    );
    console.log('Sign Up Sukses');
  }

}
