interface placementConfig {
  target: HTMLElement;
  container?: HTMLElement;
  placement?: PlacementType;
  points?: PointType;
  overlay:HTMLElement;
}

type point= 'tl'|'tc'| 'tr'| 'cl'| 'cc' |'cr'|'bl'|'bc'|'br';
export type PointType=[point,point]
export type PlacementType='topLeft'|'top'|'topRight'|'leftTop'|'left'|'leftBottom'|'rightTop'|'right'|'rightBottom'|'bottomLeft'|'bottom'|'bottomRight';

const placementMap={
  topLeft:['bl','tl'],
  top:['bc','tc'],
  topRight:['br','tr'],
  leftTop:['tr','tl'],
  left:['cr','cl'],
  leftBottom:['br','bl'],
  rightTop:['tl','tr'],
  right:['cl','cr'],
  rightBottom:['bl','br'],
  bottomLeft:['tl','bl'],
  bottom:['tc','bc'],
  bottomRight:['tr','br']

}
export default function getPlacement({
  target,
  placement,
  points: opints = ['tl', 'bl'],
  overlay,
}: placementConfig) { // 关联接口
  if(!target||!overlay){
    return{}
  }
  const { width: twidth, height: theight, left: tleft, top: ttop } = target.getBoundingClientRect();
  const { left: cleft, top: ctop } = document.body.getBoundingClientRect();
  const { scrollTop: cscrollTop, scrollLeft: cscrollLeft } = document.body;
  const { width: owidth, height: oheight } = overlay.getBoundingClientRect();

  let points = opints;
  if (placement && placement in placementMap) {
    points = placementMap[placement as keyof typeof placementMap] as PointType;
  }

  const baseTop = ttop - ctop + cscrollTop;
  const baseLeft = tleft - cleft + cscrollLeft;

  let top=baseTop;
  let left=baseLeft;

  switch(points[1][0]){
    case't':
    top+=0;
    break;
    case'c':
    top+=theight/2;
    break;
    case'b':
    top+=theight;
    break;
  }
  switch(points[1][1]){
    case'l':
    left+=0;
    break;
    case 'c':
    left+=twidth/2;
    break;
    case'r':
    left+=twidth;
    break;
  }

  switch(points[0][0]){
    case't':
    top+=0;
    break;
    case 'c':
    top-=oheight/2
    break;
    case'b':
    top-=oheight;
    break;
  }
  switch(points[0][1]){
    case'l':
    left+=0;
    break;
    case 'c':
    left-=owidth/2;
    break;
    case'r':
    left-=owidth;
    break;
  }
  return {
    position: 'absolute',
    top, // 使用计算好的变量
    left,
   
  };
}