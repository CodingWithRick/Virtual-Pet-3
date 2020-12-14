class Food {
    constructor() {
        this.foodStock = 0;
        this.lastFed;
        this.image = loadImage("../Milk.png");
        this.bed = loadImage("../bed.png");
        this.wr = loadImage("../wr.png");
        this.garden = loadImage("../garden.png");
    }

    updateFoodStock(foodStock) {
        this.foodStock = foodStock;
    }
    updateState(state) {
        database.ref("/").update({
            gameState: state
        });
    }

    getFedTime(lastFed) {
        this.lastFed = lastFed;
    }

    bedroom() {
        image(this.bed, 500, 200, 1000, 400);
    }
    g() {
        image(this.garden, 500, 200, 1000, 400);

    }
    washroom() {
        image(this.wr, 500, 200, 1000, 400);

    }



    display() {
        var x = 80
        var y = 100;

        imageMode(CENTER);
        image(this.image, 720, 220, 70, 70);

        if (this.foodStock !== 0) {
            for (var i = 0; i < this.foodStock; i++) {
                if (i % 10 == 0) {
                    x = 80;
                    y = y + 50;
                }
                image(this.image, x, y, 50, 50);
                x = x + 30;
            }
        }
    }
}
