import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const BANNER_WIDTH = Math.round(SCREEN_WIDTH * 0.78);
export const BANNER_HEIGHT = Math.round(BANNER_WIDTH * 0.5);
export const BANNER_GAP = 12;
