import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, ProductsService } from '@black-bird/products';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'admin-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {
  editMode = false;
  isSubmitted = false;
  categories = [];
  uploadedImageUrl: string | ArrayBuffer;

  productForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    brand: ['', Validators.required],
    price: ['', Validators.required],
    category: ['', Validators.required],
    description: ['', Validators.required],
    countInStock: ['', Validators.required],
    richDescription: [''],
    isFeatured: [false],
    image: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private productService: ProductsService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this._getCategories();
    this._checkEditMode();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.productForm.invalid) return;

    const productFormData = new FormData();
    const obj = this.productForm.value;

    Object.keys(obj).forEach((key) => {
      productFormData.append(key, obj[key]);
    });

    if (this.editMode) {
      this._updateProduct(this.route.snapshot.params.id, productFormData);
    } else {
      this._createProduct(productFormData);
    }
  }

  onCancel() {
    this.location.back();
  }

  onUpload(event) {
    const file = event.target.files[0];
    if (file) {
      this.productForm.get('image').patchValue(file);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.uploadedImageUrl = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe((res) => (this.categories = res));
  }

  private _createProduct(product: FormData) {
    this.productService.createProduct(product).subscribe({
      next: (res) => {
        if (res)
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Product ${res.name} created successfuly`
          });
        this.location.back();
      },
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Not able to create Product!'
        })
    });
  }

  private _updateProduct(id: string, product: FormData) {
    this.productService.updateProduct(id, product).subscribe({
      next: (res) => {
        if (res)
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Product ${res.name} updated successfuly.`
          });
        this.location.back();
      },
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Not able to create Product!'
        })
    });
  }

  private _checkEditMode() {
    this.route.params.subscribe(({ id }) => {
      if (id) {
        this.editMode = true;
        this.productService.getProductById(id).subscribe((res) => {
          this.uploadedImageUrl = res.image;
          this.productForm.patchValue(res);
          this.productForm.get('category').patchValue(res.category.id);
        });
      }
    });
  }
}
