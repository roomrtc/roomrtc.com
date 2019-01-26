import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';

import { RevealService } from '../../../services/reveal.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
declare var $: any;
declare var Reveal: any;
declare var hljs: any;
@Component({
  selector: 'app-present-new',
  templateUrl: './present-new.component.html',
  styleUrls: ['./present-new.component.css']
})
export class PresentNewComponent implements OnInit, AfterViewInit {
  // Config form
  presentForm: FormGroup;
  // model markdown
  mode;
  options;
  markdown;
  content;
  isLoading = false;
  hostElement: ElementRef;
  url: SafeResourceUrl;
  //
  @ViewChild('iframe') iframe: ElementRef;
  constructor(private fb: FormBuilder, private revealServices: RevealService, private sanitizer: DomSanitizer) {
    this.createForm();
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:3000/api/present/showReveal');
  }
  createForm() {
    this.presentForm = this.fb.group({
      templateEditor: []
    });
  }
  ngOnInit() {
    this.revealServices.getMarkDownContent().subscribe((data) => {
      console.log(data);
      this.markdown = data.data;
      // let x=data.data.toString()
    });
  }
  ngAfterViewInit() {
  //   Reveal.initialize({
  //     dependencies: [
  //         { src: '../../../../assets/reveal/lib/js/classList.js', condition: function() { return !document.body.classList; } },
  //         { src: '../../../../assets/reveal/plugin/markdown/marked.js' },
  //         { src: '../../../../assets/reveal/plugin/markdown/markdown.js' },
  //         { src: '../../../../assets/reveal/plugin/notes/notes.js', async: true },
  //         { src: '../../../../assets/reveal/plugin/highlight/highlight.js', async: true,
  //          callback: function() { hljs.initHighlightingOnLoad(); } }
  //      ],
  //     // Display controls in the bottom right corner
  //     controls: false,

  //     // Display a presentation progress bar
  //     progress: true,

  //     // If true; each slide will be pushed to the browser history
  //     history: true,

  //     // Apply a 3D roll to links on hover
  //     rollingLinks: true,
  //     width: "100%",
  //     height: "100%",
  //     margin: 0.2,
  //     top:"100px",
  //     minScale: 1,
  //     maxScale: 1
  // });
  // Reveal.configure({ slideNumber: true });
  // Reveal.configure({ slideNumber: 'c/t' });
  }
  onKeyUp() {
    const seft = this;
    $('#markdownText').keyup(function(data) {
      // console.log($(this).val())

    });
  }
  onPreview() {
    const seft = this;
    seft.revealServices.updateMarkdown(this.markdown).subscribe((data) => {
      console.log(data);
      // seft.iframe;
      seft.url = seft.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:3000/api/present/showReveal');
    });
    console.log('preview');
    // this.content=`### Cao Van`
  }
  reLoadIframe() {
    $('#slides-frame')[0].contentWindow.postMessage(JSON.stringify({
      method: 'reloadMarkdown'
    }), window.location.origin);
  }

  preRenderFunc(content: string) {
    console.log(content);

    this.content = content;
    return content; // must return a string
  }
  // Save template reveal
  onSave() {
    this.isLoading = true;
    this.revealServices.save({
      user_id: 1,
      content: this.markdown
    }).subscribe((data) => {
      this.isLoading = false;
      console.log(data);
    });
  }
}
