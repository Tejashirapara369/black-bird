import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@black-bird/products';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'admin-category-form',
  templateUrl: './category-form.component.html'
})
export class CategoryFormComponent implements OnInit {
  isSubmitted = false;
  editMode = false;

  categoryForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    icon: ['', Validators.required],
    color: ['#fff']
  });

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._checkEditMode();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.categoryForm.invalid) {
      return;
    }
    const cat: Category = { ...this.categoryForm.value };

    if (this.editMode) {
      this._updateCategory(this.route.snapshot.params.id, cat);
    } else {
      this._addCategory(cat);
    }
  }

  onCancel() {
    this.location.back();
  }

  private _updateCategory(id: string, cat: Category) {
    this.categoriesService.updateCategory(id, cat).subscribe({
      next: (res) => {
        if (res)
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Category ${res.name} updated successfuly.`
          });
        this.location.back();
      },
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Not able to create category!'
        })
    });
  }

  private _addCategory(cat: Category) {
    this.categoriesService.createCategory(cat).subscribe({
      next: (res) => {
        if (res)
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Category ${res.name} created successfuly`
          });
        this.location.back();
      },
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Not able to create category!'
        })
    });
  }

  private _checkEditMode() {
    this.route.params.subscribe(({ id }) => {
      if (id) {
        this.editMode = true;
        this.categoriesService.getCategoryById(id).subscribe((res) => {
          this.categoryForm.patchValue(res);
        });
      }
    });
  }
}
