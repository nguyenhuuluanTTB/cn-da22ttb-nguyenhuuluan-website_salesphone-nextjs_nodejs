"use client";

import { useParams } from "next/navigation";
import React from "react";

export default function DetailProductPage() {
  const params = useParams();
  const id = params?.id ?? "unknown";
  return (
    <section>
      <h1>Product detail: {id}</h1>
    </section>
  );
}