import { Route } from 'services/models/Route';

export const getMainRoutePoints = (routePoints: Route['routePoints']) => {
  /**
   * Đoạn này phải sort theo durationTime do đi tới điểm sau sẽ lâu hơn điểm trước
   * Như này dữ liệu mới đúng
   */
  return routePoints.filter(routePoint => routePoint.routeType === 'MAIN_ROUTE').sort((a, b) => a.durationTime - b.durationTime);
};

export const getSubRoutePoints = (routePoints: Route['routePoints']) => {
  return routePoints.filter(routePoint => routePoint.routeType === 'SUB_ROUTE');
};
