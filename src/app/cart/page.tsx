import { CartContent } from '@/components/cart-content';
export const metadata={title:'Your Bag'};
export default function Page(){return <div className="container page-space"><header className="page-heading"><span className="eyebrow">Your everyday essentials</span><h1>A bag full<br/>of <em>lovely.</em></h1></header><CartContent full/></div>;}
