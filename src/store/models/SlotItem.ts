export default class SlotItem {
  public name: string;
  public value: number;
  public image: string;

  constructor(name: string, value: number, image: string) {
      this.name = name;
      this.value = value;
      this.image = image;
  }
}