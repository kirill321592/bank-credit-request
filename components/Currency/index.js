import { React } from 'core-front/libs';

export default ({ children }) => <span>{children && children.toFixed(2).toString().replace('.', ',')} €</span>;
