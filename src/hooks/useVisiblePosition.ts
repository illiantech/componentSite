import { useEffect, useState } from "preact/hooks";

 const transitionViewIfSupported = (updateCb: () => void) => {
  if (document.startViewTransition) {
    return document.startViewTransition(updateCb);
  } else {
    updateCb();
  }
};


 const CLOSE_MODAL = "CLOSE_MODAL";

interface PropsVsiblePosition<T> {
  refImgPrev: T | null;
  refImgNew: T | null;
  refDialog: T | null;
  optionsKey: KeyframeEffectOptions;
}


export const useVisiblePosition = <T extends HTMLElement>({
  refImgNew,
  refImgPrev,
  refDialog,
  optionsKey
}: PropsVsiblePosition<T>) => {
  const [active, setActive] = useState<boolean>(false);

  const handleSite = () => {
    setActive(true);
  };

  useEffect(() => {
    if (active) {
      const {
        x: X_OLD,
        y: Y_OLD,
        width: W_OLD
      } = refImgPrev?.getBoundingClientRect() as DOMRect;

      transitionViewIfSupported(() => {
        document.documentElement.style.overflow = "hidden";
        document.documentElement.style.marginRight = "16px";
        (refDialog as unknown as HTMLDialogElement).showModal();

        const { x, y, width } = refImgNew?.getBoundingClientRect() as DOMRect;

        refImgNew?.animate(
          [
            {
              transform: `translateY(${-y + Y_OLD}px) translateX(${-x + X_OLD}px)`,
              width: `${W_OLD}px`,
              height: `${W_OLD}px`
            },
            {
              transform: `translateY(0px) translateX(0px)`,
              width: `${width}px`,
              height: `${width}px`
            }
          ],
          optionsKey
        );
      });
    }
  }, [active]);

  const handleClose = ({ target }: MouseEvent) => {
    if ((target as HTMLElement).id === CLOSE_MODAL) {
      transitionViewIfSupported(() => {
        document.documentElement.style.overflow = "auto";
        document.documentElement.style.marginRight = "0px";
        (refDialog.current as unknown as HTMLDialogElement).close();
      });
    }
  };

  return { active, handleSite, setActive, handleClose };
};
