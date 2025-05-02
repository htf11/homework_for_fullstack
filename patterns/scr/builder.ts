export {};

class Product {
  public parts: string[] = [];

  public listParts(): void {
    console.log(`Product parts: ${this.parts.join(", ")}\n`);
  }
}

interface Builder {
  setPartA(): void;
  setPartB(): void;
  setPartC(): void;
  getResult(): Product;
}

class ConcreteBuilder implements Builder {
  private product: Product;

  constructor() {
    this.product = new Product();
    this.reset();
  }

  public reset(): void {
    this.product = new Product();
  }

  public setPartA(): void {
    this.product.parts.push("PartA");
  }

  public setPartB(): void {
    this.product.parts.push("PartB");
  }

  public setPartC(): void {
    this.product.parts.push("PartC");
  }

  public getResult(): Product {
    const result = this.product;
    this.reset();
    return result;
  }
}

class Director {
  private builder: Builder;

  constructor(builder: Builder) {
    this.builder = builder;
  }

  public buildMinimalProduct(): void {
    this.builder.setPartA();
  }

  public buildFullProduct(): void {
    this.builder.setPartA();
    this.builder.setPartB();
    this.builder.setPartC();
  }
}

const builder = new ConcreteBuilder();
const director = new Director(builder);

director.buildMinimalProduct();
const minimalProduct = builder.getResult();
minimalProduct.listParts();

director.buildFullProduct();
const fullProduct = builder.getResult();
fullProduct.listParts();
