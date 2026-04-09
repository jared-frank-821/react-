import classNames from 'classnames';
import './index.scss';
import { useEffect, useState } from 'react';

export interface progressProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  type?: 'line' | 'circle' | 'dashboard';
  percent?: number;
  format?: (percent?: number) => string;
  showInfo?: boolean;
  strokeColor?: string;
  strokeWidth?: number;
  trailColor?: string;
  trailWidth?: number;
  size?: 'small' | 'default';
  strokeLinecap?: 'round' | 'square';
  status?: 'normal' | 'success' | 'exception' | 'active';
}

const Progress = (props: progressProps) => {
  const {
    className,
    type = 'line',
    percent = 0,
    format,
    showInfo = true,
    strokeColor ,//进度条颜色
    strokeWidth,
    trailColor = '#f5f5f5',//默认底色
    strokeLinecap = 'round',
    size = 'default',
    status = 'normal',
  } = props;

 
  
  const currentPercent = Math.max(0, Math.min(percent, 100));
  const text = format?.(currentPercent) ?? `${currentPercent}%`;
  const lineHeight = strokeWidth ?? (size === 'small' ? 6 : 8);
  const [currentStrokeColor,setCurrentStrokeColor]=useState(strokeColor);

  useEffect(()=>{
    if(currentPercent===100){
      setCurrentStrokeColor('green');
    }else{
      setCurrentStrokeColor(strokeColor || 'blue');
    }
  },[currentPercent])
  const cls = classNames(
    'ant-progress',
    `ant-progress-${type}`,
    size !== 'default' && `ant-progress-${size}`,
    status !== 'normal' && `ant-progress-status-${status}`,
    showInfo !== false && 'ant-progress-show-info',
    className,
  );

  if (type === 'circle') {
    // 计算旋转角度：每个半圆负责 180 度
    // 右侧半圆负责 0-50%，左侧负责 50-100%
    const rightDeg = Math.min(currentPercent, 50) * 3.6 - 135; 
    const leftDeg = Math.max(currentPercent - 50, 0) * 3.6 - 135;

    return (
      <div style={{
        width: 200,
        height: 200,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* 底色圆环 */}
        <div style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          border: `20px solid ${trailColor}`,
          boxSizing: 'border-box',
          position: 'absolute'
        }} />

        {/* 右半部分进度 (0% - 50%) */}
        <div style={{
          width: 100,
          height: 200,
          overflow: 'hidden',
          position: 'absolute',
          right: 0,
          top: 0
        }}>
          <div style={{
            width: 200,
            height: 200,
            borderRadius: '50%',
            border: '20px solid transparent',
            borderRightColor: currentStrokeColor,
            borderTopColor: currentStrokeColor,
            position: 'absolute',
            right: 0,
            top: 0,
            boxSizing: 'border-box',
            transform: `rotate(${rightDeg}deg)`, // 动态角度
          }} />
        </div>

        {/* 左半部分进度 (50% - 100%) */}
        <div style={{
          width: 100,
          height: 200,
          overflow: 'hidden',
          position: 'absolute',
          left: 0,
          top: 0
        }}>
          <div style={{
            width: 200,
            height: 200,
            borderRadius: '50%',
            border: '20px solid transparent',
            borderLeftColor: currentStrokeColor,
            borderBottomColor: currentStrokeColor,
            position: 'absolute',
            left: 0,
            top: 0,
            boxSizing: 'border-box',
            transform: `rotate(${leftDeg}deg)`, // 动态角度
          }} />
        </div>
        
        {/* 中间文字 */}
        {showInfo && <span style={{ position: 'absolute', fontSize: 24 }}>{text}</span>}
      </div>
    );
  }

  return (
    <div className={cls}>
      <div className="ant-progress-outer">
        <div
          className="ant-progress-inner"
          style={{ backgroundColor: trailColor }}
        >
          <div
            className="ant-progress-bg"
            style={{
              width: `${currentPercent}%`,
              height: lineHeight,
              backgroundColor: currentStrokeColor,
              borderRadius: strokeLinecap === 'square' ? 0 : 100,
            }}
          />
        </div>
      </div>
      {showInfo && <span className="ant-progress-text">{text}</span>}
    </div>
  );
}

export default Progress;
