// Class to represent a row in the seat reservations grid
function SeatReservation(name, initialMeal) {
    var self = this;
    self.name = html.data(name);
    self.meal = html.data(initialMeal);

    self.formattedPrice = html.data(function() {
        var price = self.meal().price;
        return price ? "$" + price.toFixed(2) : "None";        
    });    
}

// Overall viewmodel for this screen, along with initial state
function ReservationsViewModel() {
    var self = this;

    // Non-editable catalog data - would come from the server
    self.availableMeals = [
        { mealName: "Standard (sandwich)", price: 0 },
        { mealName: "Premium (lobster)", price: 34.95 },
        { mealName: "Ultimate (whole zebra)", price: 290 }
    ];    

    // Editable data
    self.seats = html.data([
        new SeatReservation("Steve", self.availableMeals[0]),
        new SeatReservation("Bert", self.availableMeals[1])
    ]);

    // Computed data
    self.totalSurcharge = html.data(function() {
       var total = 0;
       for (var i = 0; i < self.seats().length; i++)
           total += self.seats()[i].meal().price;
       return total;
    });

	self.seatNum = html.data(function(){
		return self.seats().length;
	});

    // Operations
    self.addSeat = function() {
        self.seats.push(new SeatReservation("", self.availableMeals[0]));
    }
    self.removeSeat = function(seat, e) { self.seats.remove(seat) }
	self.f5 = function(){
		html.data.refresh(self);
	}
}
var vm = new ReservationsViewModel();

html.render(document.body)
	.h2('Your seat reservations ').span(vm.seatNum).$().$()
	.br()
    .h2('Total surcharge ').span(vm.totalSurcharge).$().$()
	.br()
	.button('Add seat').click(vm.addSeat).refreshChange(vm).$()
	.br()
	.table()
		.thead().tr().th('Passenger name').$().th('Meal').$().th('Surcharge').$().$()
		.tbody()
			.each(vm.seats, function(seat){
				html.render(this)
				.tr()
					.td().input(seat.name).$().$()
					.td()
						.dropdown(vm.availableMeals, seat.meal, 'mealName').refreshChange(seat, vm).$()
					.$()
					.td().span(seat.formattedPrice).$().$()
					.td().a('Remove').click(vm.removeSeat, seat).click(vm.f5).$().$()
				.$()
			})
		.$()
	.$()
	
	
	
	
	
	
	
	
	
	
	