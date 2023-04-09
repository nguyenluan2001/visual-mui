export interface IComponent {
  uid: string;
  children: string | any;
  props: Record<string, string>;
  directory: string;
  parent: string;
}

export interface IDnDComponent {
  type: string;
  data: IComponent;
  index?: number;
}
