import { Wishlist } from '@/components/wishlist';
export const metadata={title:'Your Wishlist'};
export default function Page(){return <div className="container page-space"><header className="page-heading"><span className="eyebrow">Your little collection</span><h1>Love it.<br/><em>Save it for later.</em></h1></header><Wishlist/></div>;}
