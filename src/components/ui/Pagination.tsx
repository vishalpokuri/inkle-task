import { Button } from "@/components/ui/shadcn/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  onFirstPage: () => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onLastPage: () => void;
}

export function PaginationControls({
  currentPage,
  totalPages,
  canPreviousPage,
  canNextPage,
  onFirstPage,
  onPreviousPage,
  onNextPage,
  onLastPage,
}: PaginationControlsProps) {
  return (
    <div className="flex items-center justify-between mt-6 font-reg">
      <div className="flex items-center gap-2">
        <Button
          onClick={onFirstPage}
          disabled={!canPreviousPage}
          className="text-sm cursor-pointer"
        >
          <ChevronsLeft />
        </Button>
        <Button
          onClick={onPreviousPage}
          disabled={!canPreviousPage}
          className="text-sm cursor-pointer"
        >
          <ChevronLeft />
        </Button>
        <Button
          onClick={onNextPage}
          disabled={!canNextPage}
          className="text-sm cursor-pointer"
        >
          <ChevronRight />{" "}
        </Button>
        <Button
          onClick={onLastPage}
          disabled={!canNextPage}
          className="text-sm cursor-pointer"
        >
          <ChevronsRight />{" "}
        </Button>
      </div>
      <span className="text-sm text-gray-700 font-reg">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
}
