import { CaretDoubleLeft, CaretDoubleRight, CaretLeft, CaretRight } from "phosphor-react";
import { Button } from "./ui/button";

interface PaginationProps{
    pageIndex: number,
    itemsCount: number,
    perPage: number
    onPageChange: (pageIndex: number) => Promise<void> | void
}

export function Pagination({ itemsCount, pageIndex, perPage, onPageChange }: PaginationProps) {
  const pages = Math.ceil(itemsCount / perPage);

  return (
    <div className="flex items-center justify-between mt-2">
      <span className="text-sm text-muted-foreground">
        Total de {itemsCount} item(s)
      </span>
      <div className="flex items-center gap-4">
        <span>Página {pageIndex + 1} de {pages}</span>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            onClick={() => onPageChange(0)}
            disabled={pageIndex === 0}
          >
            <CaretDoubleLeft weight="bold" />
          </Button>
          <Button
            variant="outline"
            onClick={() => onPageChange(Math.max(pageIndex - 1, 0))}
            disabled={pageIndex === 0}
          >
            <CaretLeft weight="bold" />
          </Button>
          <Button
            variant="outline"
            onClick={() => onPageChange(Math.min(pageIndex + 1, pages - 1))}
            disabled={pageIndex >= pages - 1}
          >
            <CaretRight weight="bold" />
          </Button>
          <Button
            variant="outline"
            onClick={() => onPageChange(pages - 1)}
            disabled={pageIndex >= pages - 1}
          >
            <CaretDoubleRight weight="bold" />
          </Button>
        </div>
      </div>
    </div>
  );
}