# @magnal / ng-utils

Some Angular utils which I use in my projects.

## Decorators

### `@InputFlag()`

Turns a boolean `@Input()` from a directive or component into a flag to make the following statement work...

#### Example

```angular2
@Input()
@InputFlag()
public myBool:boolean;
```

```angular2html
<my-component myBool></my-component>

<!-- ... is the same as ... -->
<my-component [myBool]="true"></my-component>
```

### `@InputObservable()`

Turns an `@Input()` to an Observable.

#### Example

```angular2
@Input()
public myData:string;

@InputObservable()
public myData$:Observable<string>;
``` 

Matches the `@Input()` name without `$` sign.

### `@InputChanged()`

Creates a method which is called when the `@Input()` value is changed.

This makes use of Angular `ngOnChanges` lifecycle hook. To make it work with aot, an empty `ngOnChanges` method needs to be present.

#### Example

```angular2
@Input()
public myData:string;

@InputChanged()
public myDataChanged():void
{
  // make something with this.myData
}

// alternatively you can access 
   */
```

## Pipes

### `negate`

The `negate` pipes negates a statement. Simple as that.

#### Example

```angular2html
<!-- myStatement = false; -->

<div *ngIf="myStatement | negate">
  This is shown!
</div>
```

## Functions

### `arrayify`

Always creates an array if given data isn't already.

### `onlyOne`

Returns the one and only item in an array. When there are multiple items, it returns `null`.
