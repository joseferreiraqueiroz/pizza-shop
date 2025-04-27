import { CaretDoubleLeft, CaretDoubleRight, CaretLeft, CaretRight } from "phosphor-react";
import { Button } from "./ui/button";

interface PaginationProps{
    pageIndex: number,
    itemsCount: number,
    perPage: number
}

export function Pagination({itemsCount, pageIndex, perPage}:PaginationProps){
    const pages = Math.ceil(itemsCount/perPage)
    return(
        <div className="flex items-center justify-between mt-2">
        <span className="text-sm text-muted-foreground">
          Total de {itemsCount} item(s)
        </span>
        <div className="flex items-center gap-4">
            <span>Página {pageIndex} de {pages}</span>
           <div className="flex items-center gap-1">
           <Button variant="outline">
                <CaretDoubleLeft weight="bold"/>
            </Button>
            <Button variant="outline">
                <CaretLeft  weight="bold"/>
            </Button >
            <Button variant="outline">
                <CaretRight
                 weight="bold"
                />
            </Button>
            <Button variant="outline">
                <CaretDoubleRight  weight="bold"/>
            </Button>
           </div>
        </div>
      </div>
    )
}