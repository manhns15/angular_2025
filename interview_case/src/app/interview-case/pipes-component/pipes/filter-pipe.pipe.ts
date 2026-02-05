import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pureFilter',
  standalone: false,
})
export class FilterPipePipe implements PipeTransform {
  transform(players: any[]) {
    return players.filter((p) => p.active);
  }
}
@Pipe({
  name: 'impureFilter',
  standalone: false,
  pure: false,
})
export class ImpureFilterPipe implements PipeTransform {
  transform(players: any[]) {
    return players.filter((p) => p.active);
  }
}
