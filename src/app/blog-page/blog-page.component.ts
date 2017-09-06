import { BlogpostApi } from './../../shared/services/custom/Blogpost';
import { Blogpost } from './../../shared/models/Blogpost';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RealTime } from './../../shared/services/core/real.time';
import { FireLoopRef } from './../../shared/models/FireLoopRef';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit {

  public item: Blogpost = new Blogpost();
  public blogRef: FireLoopRef<Blogpost>;
  public BlogpostR: any;

  constructor(
    private router: Router,
    public BlogpostApi: BlogpostApi,
    private rt: RealTime
  ) { 

    this.rt.onReady().subscribe((status: string) => {
      this.blogRef = this.rt.FireLoop.ref<Blogpost>(Blogpost);
      this.blogRef.on('change').subscribe((BlogpostResult: any) => {
        console.log(BlogpostResult, 'isi todos');
        this.BlogpostR = BlogpostResult;
      });
    });

  }

  ngOnInit() {
  }

  newPost(){
    this.router.navigate(['/home/blogPost']);
  }

}
