import { NextResponse } from 'next/server';

export async function GET(request: string) {
  const req = new URL(request);
  //   const id = searchParams.get('id');
  const res = await fetch(req, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return NextResponse.json(await res.json());
}

export async function POST(request: string) {
  const req = new URL(request);
  const res = await fetch(req, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return NextResponse.json(await res.json());
}

export async function DELETE(request: string) {
  const req = new URL(request);
  const res = await fetch(req, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return NextResponse.json(await res.json());
}
