import React, { useCallback, useEffect } from "react";
import _ from "lodash";
import { Spinner } from "../elements";

function InfinityScroll(props) {
  const { children, callNext, is_next, loading } = props;

  const _handleScroll = _.throttle(() => {
    if (loading) {
      return;
    }
    // console.log("trottle");

    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const scrollTop =
      document.documentElement?.scrollTop || document.body?.scrollTop;

    if (scrollHeight - scrollTop - innerHeight < 200) {
      callNext();
    }
  }, 1000);

  const handleScroll = useCallback(_handleScroll, [_handleScroll]);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (is_next) {
      window.addEventListener("scroll", handleScroll);
    } else {
      window.removeEventListener("scroll", handleScroll);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [is_next, loading, handleScroll]);

  return (
    <>
      {children}
      {is_next && <Spinner />}
    </>
  );
}

InfinityScroll.defaultProps = {
  children: null,
  callNext: () => {},
  is_next: false,
  loading: false,
};

export default InfinityScroll;
