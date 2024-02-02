import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'sortOnIndexInParent', standalone: true })
export class SortonIndexInParentPipe implements PipeTransform {
    transform<T>(options: T[]): T[] {
        return options.sort((a, b) => (a as any).indexInParent - (b as any).indexInParent);
    }
}