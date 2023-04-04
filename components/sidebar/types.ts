type HeroIcon = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
    title?: string;
    titleId?: string;
  } & React.RefAttributes<SVGSVGElement>
>;

export type NavItem = {
  name: string;
  href: string;
  icon: HeroIcon;
};
