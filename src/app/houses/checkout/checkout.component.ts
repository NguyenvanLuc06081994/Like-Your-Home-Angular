import {Component, OnInit} from '@angular/core';
import {HouseService} from '../../services/house.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from '../../services/customer.service';
import {BillService} from '../../services/bill.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {DataService} from '../../services/data.service';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  house = {
    id: '',
    name: '',
    type_house: '',
    type_room: '',
    address: '',
    bedroom: '',
    bathroom: '',
    description: '',
    status: '',
    price: '',
    image: '',
    customer_id: ''
  };

  customer: any = {
    username: ''
  };

  bill = {
    totalPrice: '',
    checkIn: '',
    checkOut: '',
    status: '',
    order: '',
    description: '',
    customer_id: '',
    house_id: ''
  };

  formCheckout: FormGroup;
  userLogin;
  formDetail;
  fullName;
  phone;
  email;
  Adults = '1 Adults';
  totalPrice;

  constructor(private houseService: HouseService,
              private router: Router,
              private route: ActivatedRoute,
              private customerService: CustomerService,
              private billService: BillService,
              private fb: FormBuilder,
              private authService: AuthService,
              private dataService: DataService,
              private toast: ToastrService) { }

  id = +this.route.snapshot.paramMap.get('id');

  ngOnInit(): void {
    const userLogin = this.authService.getUserLogin();
    console.log(userLogin);
    this.formCheckout = this.fb.group({
      checkIn: [''],
      checkOut: [''],
      order: ['',Validators.required],
      description: ['']
    });
    this.getHouse();
    this.dataService.dataShare.subscribe(result => {
      this.formDetail = result;

    });
  }

  getHouse() {
    const user = this.authService.getUserLogin();
    this.houseService.getHouseId(this.id).subscribe(data => {
      this.house = data;
      // @ts-ignore
      this.customerService.getCustomerById(user.id).subscribe(result => {
        // @ts-ignore
        this.customer = result.user;
        this.fullName = this.customer.username;
        this.phone = this.customer.phone;
        this.email = this.customer.email;
      });
    });
  }

  get order()
  {
    return this.formCheckout.get('order');
  }

  addBill(): any {
    console.log(this.formCheckout.value);
    this.userLogin = this.authService.getUserLogin();
    console.log(this.formCheckout.value.checkIn);
    this.bill.checkIn = this.formCheckout.value.checkIn;
    this.bill.checkOut = this.formCheckout.value.checkOut;
    this.bill.order = this.formCheckout.value.order;
    this.bill.customer_id = this.userLogin.id;
    // @ts-ignore
    this.bill.house_id = this.house.id;
    const checkIn = new Date(`"${this.formCheckout.value.checkIn}"`);
    const getDateCheckIn = checkIn.getDate();
    const checkOut = new Date(`"${this.formCheckout.value.checkOut}"`);
    const getDateCheckOut = checkOut.getDate();
    const result = getDateCheckOut - getDateCheckIn;
    // @ts-ignore
    this.bill.totalPrice = result * this.house.price;
    // @ts-ignore
    this.totalPrice = result * this.house.price;
    console.log(this.bill);
    this.bill.status = 'pending';
    this.bill.order = this.formCheckout.value.order;
    this.bill.description = this.formCheckout.value.description;
    console.log(this.bill);
    this.billService.addBill(this.bill).subscribe(data => {
    });
    // console.log(this.house);
    this.houseService.updateStatus(+this.house.id, this.house).subscribe(page => {
      this.router.navigate(['/home']);
      this.showSuccess();
    });

  }

  showSuccess()
  {
    this.toast.success('Checkout Success!!', 'Alert');
  }

}
