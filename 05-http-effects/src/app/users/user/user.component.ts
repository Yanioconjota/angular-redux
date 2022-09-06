import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { loadUser } from '../../store/actions/user.actions';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  user!: User | null;
  loading = false;
  error: any;
  subscriber!: Subscription;

  constructor(private router: ActivatedRoute,
              private store: Store<AppState>) { }

  ngOnInit(): void {

    this.subscriber = this.store.select('user')
        .subscribe(({user, loading, error}) => {
          this.user = user;
          this.loading = loading;
          this.error = error;
        })

    this.router.params.subscribe(({id}) => {
      this.store.dispatch(loadUser({id: id}));
    })
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

}
